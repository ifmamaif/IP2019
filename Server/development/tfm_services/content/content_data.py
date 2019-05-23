from collections import namedtuple

# -------------------------------------------------------------------------------
# Stories Info
# -------------------------------------------------------------------------------

StoryInfo = namedtuple("StoryInfo", ["id", "title", "cover_path", "start_chapter_id"])
AddStoryInfo = namedtuple("AddStoryInfo", ["id", "title", "cover_path", "start_chapter_id"])

# -------------------------------------------------------------------------------
# Chapters Info
# -------------------------------------------------------------------------------

ChapterInfo = namedtuple("ChapterInfo", ["id", "setting", "record_path", "cover_path", "character_path", "story_id"])
AddChapterInfo = namedtuple("AddChapterInfo", ["id", "setting", "record_path", "cover_path", "character_path", "story_id", "bias"])

# -------------------------------------------------------------------------------
# Chapters Linkings Info
# -------------------------------------------------------------------------------

ChaptersLinkingInfo = namedtuple("ChaptersLinkingInfo", ["start_chapter_id", "end_chapter_id", "labels"])
AddChaptersLinkingInfo = namedtuple("AddChaptersLinkingInfo", ["start_chapter_id", "end_chapter_id", "labels"])

# -------------------------------------------------------------------------------
# Room Biases + Room Transitions Info
# -------------------------------------------------------------------------------

RoomBiasInfo = namedtuple("RoomBiasInfo", ["room_id", "bias"])

# -------------------------------------------------------------------------------
# Convert from json to Info
# -------------------------------------------------------------------------------

def _convert_json_to_add_story_info_(story_json):
    
    return AddStoryInfo(id = story_json["id"],
                        title = story_json["title"],
                        cover_path = story_json["cover_path"],
                        start_chapter_id = story_json["start_chapter_id"])

def _convert_json_to_add_chapter_info_(chapter_json):

    return AddChapterInfo(id = chapter_json["id"],
                          setting = chapter_json["setting"],
                          record_path = chapter_json["record_path"],
                          cover_path = chapter_json["cover_path"],
                          character_path = chapter_json["character_path"],
                          story_id = chapter_json["story_id"],
                          bias = chapter_json["bias"])

def _convert_json_to_add_chapters_linking_info_(chapters_linking_json):
    
    return AddChaptersLinkingInfo(

        start_chapter_id = chapters_linking_json["start_chapter_id"],
        end_chapter_id = chapters_linking_json["end_chapter_id"],
        labels = chapters_linking_json["labels"]
    )

_from_json_converter_ = {

    AddStoryInfo : _convert_json_to_add_story_info_,
    AddChapterInfo : _convert_json_to_add_chapter_info_,
    AddChaptersLinkingInfo : _convert_json_to_add_chapters_linking_info_,
}

def convert_json_to_info(json, info_class):
    
    try:
        if info_class in _from_json_converter_:
            return _from_json_converter_[info_class](json)
    except:
        return None

# -------------------------------------------------------------------------------
# Convert from Info to json
# -------------------------------------------------------------------------------

def _convert_story_info_to_json_(story_info):

    if isinstance(story_info, StoryInfo):
        return dict(story_info._asdict())

def _convert_chapter_info_to_json_(chapter_info):

    if isinstance(chapter_info, ChapterInfo):
        return dict(chapter_info._asdict())

def _convert_chapters_linking_info_to_json_(chapters_linking_info):

    if isinstance(chapters_linking_info, ChaptersLinkingInfo):
        return dict(chapters_linking_info._asdict())

_to_json_converter_ = {
    StoryInfo : _convert_story_info_to_json_,
    ChapterInfo : _convert_chapter_info_to_json_,
    ChaptersLinkingInfo : _convert_chapters_linking_info_to_json_
}

def convert_info_to_json(info):
    info_class = info.__class__

    if info_class in _to_json_converter_:
        return _to_json_converter_[info_class](info)