import inspect
import os
import pickle
import sys
import numpy
from sklearn.neighbors import KNeighborsClassifier
from tfm_services.knearest_wrapper.knearest_utilities import (
    getRestrictedLabels, getShrinkedCorpus, getShrinkedLabels, getInputTransform)
from sklearn.feature_extraction.text import TfidfVectorizer

class KnearestWrapper:
    
    def __init__(self, pathToModel, pathToFitting, pathToVectorizer, biasDict, roomToEdgesDict):

        wrapper_dir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
        services_dir = os.path.dirname(wrapper_dir)

        self._model = pickle.load(open(services_dir + pathToModel, 'rb'))
        self._fitting = pickle.load(open(services_dir + pathToFitting, 'rb'))
        self._vectorizer = pickle.load(open(services_dir + pathToVectorizer, 'rb'))

        self._biasDict = biasDict
        self._roomToEdgesDict = roomToEdgesDict
    
    def _getBias(self, roomId):
        if roomId in self._biasDict:
            return self._biasDict[roomId]
        return " "
        #if no bias was found, return empty string

    def _getEdges(self, roomId):
        "Gets edges corresponding to a room. Edges contain a destination ( a new room id ), and some labels that the algorithm uses to determine where it needs to go"
        
        if roomId in self._roomToEdgesDict:
            return self._roomToEdgesDict[roomId]
        
        raise Exception("Something went terribly wrong in room with ID: {}".format(roomId))

    def _getAllLabels(self, edges):
        "Gets all labels within referenced in a list of edges"
    
        allLabels = []
        for edge in edges:
            allLabels += edge["Labels"]
    
        return allLabels
    
    def _getUnifiedLabels(self, shrinkedLabels, edges):
        "Returns a labeling model where each cluster is actually a room"
    
        labelToRoomDict = {}
    
        for edge in edges:
            for label in edge["Labels"]:
                labelToRoomDict[label] = edge["Destination"]
    
        unifiedLabels = []
        for label in shrinkedLabels:
            unifiedLabels.append(labelToRoomDict[label])
        
        return unifiedLabels

    def modifiedKmeans(self, playerInput, roomId):
        "Returns the id of the room it goes to"
        bias = self._getBias(roomId)
        playerInput = (playerInput + " " + bias).lower()

        edges = self._getEdges(roomId)
    
        allLables = self._model.labels_
        usableLabels = self._getAllLabels(edges)
    
        restrictedLabels = getRestrictedLabels(usableLabels, allLables)
        shrinkedCorpus = getShrinkedCorpus(restrictedLabels, self._vectorizer)
        shrinkedLabels = getShrinkedLabels(restrictedLabels)
    
        unifiedLabels = self._getUnifiedLabels(shrinkedLabels, edges)

        print(unifiedLabels)
        
        classifier = KNeighborsClassifier(n_neighbors=5)
        classifier.fit(shrinkedCorpus, unifiedLabels)

        transformedInput = self._fitting.transform([playerInput])
        return classifier.predict(transformedInput)[0].item()