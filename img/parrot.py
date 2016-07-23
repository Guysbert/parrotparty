import os
files = os.listdir('.')

id = 0
for file in files:
    if file != 'parrot.py':
        path = 'img/' + file
        name = file[:-4]
        print "{id: %s, name: '%s', path: '%s'}," % (id, name, path)
        id = id + 1 
        