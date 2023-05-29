from LearnSomeWords.models import Word
import csv
from datetime import date,datetime


def run():
    with open('LearnSomeWords/data.csv',encoding='utf-8') as file:
        reader = csv.reader(file)
        #next(reader)  # Advance past the header

        Word.objects.all().delete()

        for row in reader:
            #print(row)

            #genre, _ = Genre.objects.get_or_create(name=row[-1])

            word = Word(word=row[0], 
            pos = row[1],translation=row[2],phone=row[3],code=row[4],sentences=row[5],chosen=False,date=datetime(2020, 5, 17))
            word.save()