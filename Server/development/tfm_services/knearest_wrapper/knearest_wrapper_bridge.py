from tfm_services.utils.synchronized_singleton import SyncSingleton
from tfm_services.content.content_dal import ContentDAL
from tfm_services.content.content_data import RoomBiasInfo, ChaptersLinkingInfo

class KnearestWrapperBridge(metaclass=SyncSingleton):

    def __init__(self):

        self._dal_ = ContentDAL()
        self._room_to_bias = {}
        self._room_to_edges = {}

    def get_room_to_bias(self):
        return self._room_to_bias

    def get_room_to_edges(self):
        return self._room_to_edges

    def configure_bridge(self):

        # configure room biases
        rooms_biases = self._dal_.get_room_biases()

        if isinstance(rooms_biases, list):
            self._room_to_bias.update({room_bias.room_id : room_bias.bias for room_bias in rooms_biases})
            
        # configure room edges
        chapters_linkings = self._dal_.get_chapters_linkings()

        if isinstance(chapters_linkings, list):
            for chapters_linking in chapters_linkings:
                
                start_chapter_id = chapters_linking.start_chapter_id
                end_chapter_id = chapters_linking.end_chapter_id
                labels = chapters_linking.labels

                if start_chapter_id not in self._room_to_edges:
                    self._room_to_edges[start_chapter_id] = []
                
                self._room_to_edges[start_chapter_id].append({
                    
                    'Destination' : end_chapter_id,
                    'Labels': labels
                })