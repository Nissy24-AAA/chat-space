# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true,null: false, unique: true|
|email|string|null: false, unipue: true|
|password|string|null: false|

### Association
- has_many :groups, through: :groups_users
- has_many :groups_users
- has_many :massages



## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|index: true,null: false, unipue: true|
|name_id|integer|null: false, foreign_key: true|

### Association
- has_many :users, through: :groups_users
- has_many :groups_users
- has_many :messages



## messageテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group



## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user