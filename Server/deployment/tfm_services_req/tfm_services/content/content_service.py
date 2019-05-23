from json import JSONDecodeError
from pyramid.view import view_config

from tfm_services.service_response import (ServiceResponse, ServiceStatus,
                                           ServiceType, build_view_response)

from tfm_services.authentication.authentication_decorator import \
    authorize_operation
from tfm_services.content.content_dal import ContentDAL

from tfm_services.content.content_data import StoryInfo, AddStoryInfo
from tfm_services.content.content_data import ChapterInfo, AddChapterInfo
from tfm_services.content.content_data import ChaptersLinkingInfo, AddChaptersLinkingInfo
from tfm_services.content.content_data import convert_info_to_json, convert_json_to_info

from tfm_services.knearest_wrapper.knearest_wrapper_bridge import KnearestWrapperBridge
from tfm_services.knearest_wrapper.knearest_wrapper import KnearestWrapper
from tfm_services.knearest_wrapper.knearest_config import KnearestConfig

class ContentService:

    def __init__(self, request):

        self._request_ = request
        self._dal_ = ContentDAL()

    def _get_request_parameter_(self, key):

        parameter = None
        
        try:
            parameter = self._request_.json_body.get(key)
        except Exception:
            parameter = None
        return parameter

    # -------------------------------------------------------------------------------
    # Content Operations
    # -------------------------------------------------------------------------------
    @view_config(route_name = 'tfm_clear_content', request_method = 'DELETE')
    @authorize_operation
    def clear_content(self, authentication_jwt):
        
        service_response = ServiceResponse(service_type=ServiceType.TFM_CLEAR_CONTENT)
    
        result = self._dal_.clear_content()
        service_response.service_status = ServiceStatus.OK if result else ServiceStatus.INTERNAL_SERVER_ERROR

        return build_view_response(service_response)

    # -------------------------------------------------------------------------------
    # Stories Operations
    # -------------------------------------------------------------------------------
    @view_config(route_name = 'tfm_get_all_stories', request_method = 'GET')
    @authorize_operation
    def get_all_stories(self, authentication_jwt):

        service_response = ServiceResponse(service_type=ServiceType.TFM_GET_ALL_STORIES)
        story_infos = self._dal_.get_all_stories()
        
        if story_infos is not None:
            service_response.service_status = ServiceStatus.OK
            service_response.add_data('stories', [convert_info_to_json(story_info) for story_info in story_infos])
        else:
            service_response.service_status = ServiceStatus.NOT_FOUND

        return build_view_response(service_response)

    @view_config(route_name = 'tfm_get_stories', request_method = 'GET')
    @authorize_operation
    def get_stories(self, authentication_jwt):

        service_response = ServiceResponse(service_type=ServiceType.TFM_GET_STORIES)
        story_ids = self._get_request_parameter_('story_ids')

        if isinstance(story_ids, list):

            story_infos = self._dal_.get_stories(story_ids)
            
            if story_infos is not None:
                service_response.service_status = ServiceStatus.OK
                service_response.add_data('stories', [convert_info_to_json(story_info) for story_info in story_infos])
            else:
                service_response.service_status = ServiceStatus.NOT_FOUND

        return build_view_response(service_response)

    @view_config(route_name = 'tfm_add_stories', request_method = 'POST')
    @authorize_operation
    def add_stories(self, authentication_jwt):

        service_response = ServiceResponse(service_type=ServiceType.TFM_ADD_STORIES)

        if authentication_jwt.is_admin:
            stories = self._get_request_parameter_('stories')

            if isinstance(stories, list):
                add_story_infos = [convert_json_to_info(story, AddStoryInfo) for story in stories]
                result = self._dal_.add_stories(add_story_infos)

                service_response.service_status = ServiceStatus.CREATED if result \
                    else ServiceStatus.CONFLICT
        else:
            service_response.service_status = ServiceStatus.UNAUTHORIZED

        return build_view_response(service_response)

    # -------------------------------------------------------------------------------
    # Chapters Operations
    # -------------------------------------------------------------------------------

    @view_config(route_name = 'tfm_get_chapters', request_method = 'GET')
    @authorize_operation
    def get_chapters(self, authentication_jwt):

        service_response = ServiceResponse(service_type=ServiceType.TFM_GET_CHAPTERS)
        chapter_ids = self._get_request_parameter_('chapter_ids')

        if isinstance(chapter_ids, list):
            chapter_infos = self._dal_.get_chapters(chapter_ids)
            
            if chapter_infos is not None:
                service_response.service_status = ServiceStatus.OK
                service_response.add_data('chapters', [convert_info_to_json(chapter_info) for chapter_info in chapter_infos])
            else:
                service_response.service_status = ServiceStatus.NOT_FOUND

        return build_view_response(service_response)

    @view_config(route_name = 'tfm_add_chapters', request_method = 'POST')
    @authorize_operation
    def add_chapters(self, authentication_jwt):

        service_response = ServiceResponse(service_type=ServiceType.TFM_ADD_CHAPTERS)

        if authentication_jwt.is_admin:
            chapters = self._get_request_parameter_('chapters')

            if isinstance(chapters, list):
                
                add_chapter_infos = [convert_json_to_info(chapter, AddChapterInfo) for chapter in chapters]
                result = self._dal_.add_chapters(add_chapter_infos)
                
                service_response.service_status = ServiceStatus.CREATED if result \
                    else ServiceStatus.CONFLICT
        else:
            service_response.service_status = ServiceStatus.UNAUTHORIZED

        return build_view_response(service_response)
    
    # -------------------------------------------------------------------------------
    # Chapters Linkings Operations
    # -------------------------------------------------------------------------------
    
    @view_config(route_name = 'tfm_add_chapters_linkings', request_method = 'POST')
    @authorize_operation
    def add_chapters_linkings(self, authentication_jwt):

        service_response = ServiceResponse(service_type=ServiceType.TFM_ADD_CHAPTERS_LINKINGS)

        if authentication_jwt.is_admin:
            chapters_linkings = self._get_request_parameter_('chapters_linkings')

            if chapters_linkings and isinstance(chapters_linkings, list):
                
                add_chapters_linking_infos = [convert_json_to_info(chapters_linking, AddChaptersLinkingInfo)
                    for chapters_linking in chapters_linkings]
                result = self._dal_.add_chapters_linkings(add_chapters_linking_infos)
                
                service_response.service_status = ServiceStatus.CREATED if result \
                    else ServiceStatus.CONFLICT
        else:
            service_response.service_status = ServiceStatus.UNAUTHORIZED

        return build_view_response(service_response)

    @view_config(route_name = 'tfm_send_chapter_response', request_method = 'GET')
    @authorize_operation
    def send_chapter_response(self, authentication_jwt):
        
        service_response = ServiceResponse(service_type=ServiceType.TFM_SEND_CHAPTER_RESPONSE)
        
        if authentication_jwt.is_admin:

            chapter_id = self._get_request_parameter_('chapter_id')
            player_input = self._get_request_parameter_('player_input')

            if chapter_id and player_input:
                try:
                    wrapperBridge = KnearestWrapperBridge()
                    knearest_wrapper = KnearestWrapper(
                        
                        pathToModel = KnearestConfig.FINALIZED_MODEL,
                        pathToFitting = KnearestConfig.FINALIZED_FITTING,
                        pathToVectorizer = KnearestConfig.FINALIZED_VECTORIZER,
                        biasDict = wrapperBridge.get_room_to_bias(),
                        roomToEdgesDict = wrapperBridge.get_room_to_edges()
                    )

                    next_chapter_id = knearest_wrapper.modifiedKmeans(
                        playerInput = player_input,
                        roomId = chapter_id
                    )

                    service_response.add_data('next_chapter_id', next_chapter_id)
                    service_response.service_status = ServiceStatus.OK
                except:
                    service_response.service_status = ServiceStatus.NOT_FOUND
        else:
            service_response.service_status = ServiceStatus.UNAUTHORIZED

        return build_view_response(service_response)