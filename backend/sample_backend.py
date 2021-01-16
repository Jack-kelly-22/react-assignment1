from flask import Flask,Response
from flask import request
from flask import jsonify
from flask_cors import CORS
import uuid
import json

app = Flask(__name__)
CORS(app)

users = {
   'users_list' :
   [
      {
         'id' : 'xyz779',
         'name' : 'Charlie',
         'job': 'Janitor',
      },
      {
         'id' : 'abc123',
         'name': 'Mac',
         'job': 'Bouncer',
      },
      {
         'id' : 'ppp222',
         'name': 'Mac',
         'job': 'Professor',
      },
      {
         'id' : 'yat999',
         'name': 'Dee',
         'job': 'Aspring actress',
      },
      {
         'id' : 'zap555',
         'name': 'Dennis',
         'job': 'Bartender',
      }
   ]
}

@app.route('/')
def hello_world():
    return "hello world"

@app.route('/users',methods = ['GET',"POST"])

def get_users():
   if request.method == 'GET':
      user_ls =[]
      search_username = request.args.get('name')
      #parameter'name' of request
      if search_username:
         for user in users['users_list']:
            if user['name'] == search_username:
               user_ls.append(user)
         return {'users_list': user_ls}
      return users
   elif request.method== "POST":
      new_user = request.get_json()
      new_user['id'] = str(uuid.uuid1())
      users['users_list'].append(new_user)
      print(new_user)
      new_user = json.dumps(new_user)
      return Response(response=new_user,status=201)


@app.route('/users/<id>',methods = ['GET',"DELETE"])
def get_user(id):
   if id:
      if request.method == "GET":
         for user in users['users_list']:
            if user['id'] == id:
               return user
         return ({})

      elif request.method == "DELETE":
         for user in users['users_list']:
            if user['id'] == id:
               users['users_list'].remove(user)
               return Response(status=204)
         return Response(status=404)

   return users


@app.route('/users/<id>/<job>',methods = ['GET'])
def get_users_with_job(id,job):
   if id and job:
      for user in users["users_list"]:
         if(user['id']==id and user['job']==job):
            return user
      return ({})

