import pprint
import pymongo
import wikipedia

from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/collegemap')

db = client.collegemap
colleges = db.colleges

for college in colleges.find({}):
	name = college['name']
	coordinates = wikipedia.page(name).coordinates
	(latitude, longitude) = coordinates
	colleges.update({'_id': college['_id']}, {'$set': {'coordinates': {'latitude': float(latitude), 'longitude': float(longitude)}}})

for college in colleges.find({}):
	pprint.pprint(college)
