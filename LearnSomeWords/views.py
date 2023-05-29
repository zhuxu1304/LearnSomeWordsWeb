from django.shortcuts import render,redirect
import json
import datetime
from .models import Word
import random
from django.urls import reverse
# functions
def get_words():
    amount = 15
    result = []
    # get old words
    review_date = [1, 2, 4, 7, 15]
    for day in review_date:
        words = Word.objects.filter(chosen=True).filter(date=datetime.date.today() - datetime.timedelta(day))
        for word in words:
            result.append(word)
    
    # choose new words
    if not Word.objects.filter(date=datetime.date.today()).filter(chosen=True).exists():
    
        for i in range(amount):
            unchosen = Word.objects.filter(chosen=False)
            word = unchosen[i]
            word.chosen = True
            word.date = datetime.date.today()
            result.append(word)
            word.save()
            
    else:
        
        words = Word.objects.filter(chosen=True).filter(date=datetime.date.today())
        for word in words:
            result.append(word)

    # unchoose words older than 45 days
    words = Word.objects.filter(date=datetime.date.today() - datetime.timedelta(45)).filter(chosen=True)
    for word in words:
        word.chosen=False
        word.save()
        
    return result

def merge(data):
    words = []
    translation = []
    sentences = []

    for word in data:
        # convert sentences to list
        try:
            s = json.loads(word.sentences.replace("\'", "\""))
        except:
            s = ''
        
        words.append(word.word)
        translation.append(f'[{word.phone}] {word.pos} {word.translation}')
        sentences.append(s)

    return words, translation,sentences

def mix(a,b,c):
    l = list(zip(a,b,c))
    random.shuffle(l)
    a,b,c = zip(*l)
    return a,b,c

# Create your views here.





def index(request):
    if request.method == 'GET':
        words,translation,sentences = merge(get_words())
        words,translation,sentences = mix(words,translation,sentences)
        data = json.dumps({"words":words,"translation":translation,"sentences":sentences})
        return render(request,"LearnSomeWords/app.html",{"data":data})
    else:
        return redirect('success')

def success(request):
    return render(request,"LearnSomeWords/success.html")
