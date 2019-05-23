from tfm_services.content.content_data import (AddChapterInfo,
                                               AddChaptersLinkingInfo,
                                               AddStoryInfo, ChapterInfo,
                                               ChaptersLinkingInfo,
                                               RoomBiasInfo, StoryInfo)
from tfm_services.content.databases.mysql.chapter import Chapter
from tfm_services.content.databases.mysql.chapters_linking import \
    ChaptersLinking
from tfm_services.content.databases.mysql.room_bias import RoomBias
from tfm_services.content.databases.mysql.rooms_transition import \
    RoomsTransition
from tfm_services.content.databases.mysql.story import Story
from tfm_services.databases.mysql.transaction import (ETransactionStatus,
                                                      Transaction)

class ContentDAL:

    # -------------------------------------------------------------------------------
    # Stories DAL
    # -------------------------------------------------------------------------------
    
    def clear_content(self):
        
        transaction = Transaction.buildTransaction(ContentCallback.clear_content)
        transaction.execute()

        return transaction.status == ETransactionStatus.Successful

    def get_all_stories(self):
        
        transaction = Transaction.buildTransaction(ContentCallback.get_all_stories)
        transaction.execute()

        if transaction.status == ETransactionStatus.Successful:
            return transaction.result

    def get_stories(self, story_ids):

        transaction = Transaction.buildTransaction(ContentCallback.get_stories, story_ids)
        transaction.execute()

        if transaction.status == ETransactionStatus.Successful:
            return transaction.result

    def add_stories(self, add_story_infos):

        transaction = Transaction.buildTransaction(ContentCallback.add_stories, add_story_infos)
        transaction.execute()

        return transaction.status == ETransactionStatus.Successful

    # -------------------------------------------------------------------------------
    # Chapters DAL
    # -------------------------------------------------------------------------------

    def get_chapters(self, chapter_ids):

        transaction = Transaction.buildTransaction(ContentCallback.get_chapters, chapter_ids)
        transaction.execute()

        if transaction.status == ETransactionStatus.Successful:
            return transaction.result

    def add_chapters(self, add_chapter_infos):
    
        transaction = Transaction.buildTransaction(ContentCallback.add_chapters, add_chapter_infos)
        transaction.execute()

        return transaction.status == ETransactionStatus.Successful

    # -------------------------------------------------------------------------------
    # Chapters Linkings DAL
    # -------------------------------------------------------------------------------

    def get_chapters_linkings(self):

        transaction = Transaction.buildTransaction(ContentCallback.get_chapters_linkings)
        transaction.execute()

        if transaction.status == ETransactionStatus.Successful:
            return transaction.result
   
    def add_chapters_linkings(self, add_chapters_linking_infos):

        transaction = Transaction.buildTransaction(ContentCallback.add_chapters_linkings, add_chapters_linking_infos)
        transaction.execute()

        return transaction.status == ETransactionStatus.Successful

    # -------------------------------------------------------------------------------
    # Room biases DAL
    # -------------------------------------------------------------------------------
    def get_room_biases(self):
        
        transaction = Transaction.buildTransaction(ContentCallback.get_room_biases)
        transaction.execute()

        if transaction.status == ETransactionStatus.Successful:
            return transaction.result

class ContentCallback:

    # -------------------------------------------------------------------------------
    # Stories Callbacks
    # -------------------------------------------------------------------------------

    @staticmethod
    def clear_content(db_session):
    
        rooms_biases = db_session.query(RoomBias).all()
        rooms_transitions = db_session.query(RoomsTransition).all()
        chapters_linkings = db_session.query(ChaptersLinking).all()
        chapters = db_session.query(Chapter).all()
        stories = db_session.query(Story).all()

        for room_bias in rooms_biases:
            db_session.delete(room_bias)
        for rooms_transition in rooms_transitions:
            db_session.delete(rooms_transition)
        for chapters_linking in chapters_linkings:
            db_session.delete(chapters_linking)
        for chapter in chapters:
            db_session.delete(chapter)
        for story in stories:
            db_session.delete(story)

    @staticmethod
    def get_all_stories(db_session):
        
        stories = db_session.query(Story) \
                            .all()

        return [ContentCallback._convert_to_story_info_(story) for story in stories]

    @staticmethod
    def get_stories(db_session, story_ids):

        stories = db_session.query(Story) \
                            .filter(Story.id.in_(story_ids)) \
                            .all()

        return [ContentCallback._convert_to_story_info_(story) for story in stories]
    
    @staticmethod
    def add_stories(db_session, add_story_infos):
        
        stories = [Story(id = add_story_info.id,
                         title = add_story_info.title,
                         cover_path = add_story_info.cover_path,
                         start_chapter_id = add_story_info.start_chapter_id) for add_story_info in add_story_infos]

        db_session.add_all(stories)
    
    @staticmethod
    def _convert_to_story_info_(db_session, story):

        return StoryInfo(id = story.id, 
                         title = story.title,
                         cover_path = story.cover_path, 
                         start_chapter_id = story.start_chapter_id)
   
    # -------------------------------------------------------------------------------
    # Chapters Callbacks
    # -------------------------------------------------------------------------------
                              
    @staticmethod
    def get_chapters(db_session, chapter_ids):

        chapters = db_session.query(Chapter) \
                             .filter(Chapter.id.in_(chapter_ids)) \
                             .all()

        return [ContentCallback._convert_to_chapter_info_(chapter) for chapter in chapters]

    @staticmethod
    def add_chapters(db_session, add_chapter_infos):

        for add_chapter_info in add_chapter_infos:

            chapter = Chapter(id = add_chapter_info.id,
                              setting = add_chapter_info.setting,
                              record_path = add_chapter_info.record_path,
                              cover_path = add_chapter_info.cover_path,
                              character_path = add_chapter_info.character_path,
                              story_id = add_chapter_info.story_id)
            room_bias = RoomBias(room_id = add_chapter_info.id,
                                 bias = add_chapter_info.bias)
        
            db_session.add(chapter)
            db_session.add(room_bias)

    @staticmethod
    def _convert_to_chapter_info_(chapter):
        return ChapterInfo(id = chapter.id, 
                           setting = chapter.setting,
                           record_path = chapter.record_path, 
                           cover_path = chapter.cover_path,
                           character_path = chapter.character_path,
                           story_id = chapter.story_id)
       
    # -------------------------------------------------------------------------------
    # ChaptersLinkings Callbacks
    # -------------------------------------------------------------------------------
    
    @staticmethod
    def get_chapters_linkings(db_session):

        chapters_linkings_data = []
        chapters_linkings = db_session.query(ChaptersLinking).all()

        for chapters_linking in chapters_linkings:
            rooms_transitions = db_session.query(RoomsTransition) \
                      .filter(
                          RoomsTransition.start_room_id == chapters_linking.start_chapter_id,
                          RoomsTransition.end_room_id == chapters_linking.end_chapter_id
                      ).all()

            chapters_linking_info = ContentCallback._convert_to_chapters_linking_info_(chapters_linking, rooms_transitions)
            chapters_linkings_data.append(chapters_linking_info)

        return chapters_linkings_data

    @staticmethod
    def add_chapters_linkings(db_session, add_chapters_linking_infos):

        for add_chapters_linking_info in add_chapters_linking_infos:
            chapters_linking = ChaptersLinking(start_chapter_id = add_chapters_linking_info.start_chapter_id,
                                               end_chapter_id = add_chapters_linking_info.end_chapter_id)
                                 
            rooms_transitions = [RoomsTransition(start_room_id = add_chapters_linking_info.start_chapter_id,
                                                 end_room_id = add_chapters_linking_info.end_chapter_id,
                                                 label = label) for label in add_chapters_linking_info.labels]

            db_session.add(chapters_linking)
            db_session.add_all(rooms_transitions)
    
    @staticmethod
    def _convert_to_chapters_linking_info_(chapters_linking, rooms_transitions):
        
        return ChaptersLinkingInfo(start_chapter_id = chapters_linking.start_chapter_id,
                                   end_chapter_id = chapters_linking.end_chapter_id,
                                   labels = [rooms_transition.label for rooms_transition in rooms_transitions])

    # -------------------------------------------------------------------------------
    # Room biases Callbacks
    # -------------------------------------------------------------------------------
    @staticmethod
    def get_room_biases(db_session):

        room_biases = db_session.query(RoomBias).all()
        return [ContentCallback._convert_to_room_bias_info_(room_bias) for room_bias in room_biases]

    @staticmethod
    def _convert_to_room_bias_info_(room_bias):
        
        return RoomBiasInfo(room_id = room_bias.room_id,
                            bias = room_bias.bias)
