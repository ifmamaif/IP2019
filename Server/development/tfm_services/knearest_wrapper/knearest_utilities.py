import numpy as np

def getRestrictedLabels(usableLabels, kmLabels):
    "Gets a new km.labels_ like object, that can be used to k-nearest classify an input between some but not all the clusters"
        
    kmLabels = kmLabels.copy()
    for i in range(len(kmLabels)):
        label = kmLabels[i]
        if label not in usableLabels:
            kmLabels[i] = -1
        
    return kmLabels

def getShrinkedCorpus(restrictedLabels, corpus):
    "Shrinks a corpus to relevant labels"

    bool_vect = restrictedLabels != -1
    indices = np.where(bool_vect)[0]
    shrinked_corpus = corpus.tocsc()[indices,:]
    return shrinked_corpus

def getShrinkedLabels(restrictedLabels):
    "Shrinks the label list to match the shrinkatinated corpus"
    
    shrinkedLabels = []
    for i in range(len(restrictedLabels)):
        if restrictedLabels[i] != -1:
            shrinkedLabels.append(restrictedLabels[i])
    
    return shrinkedLabels

def getInputTransform(curatedPlayerInput):
    vectorizer = TfidfVectorizer(min_df = 0.5, max_df = 1, stop_words = 'english')
    return vectorizer.transform(curatedPlayerInput)