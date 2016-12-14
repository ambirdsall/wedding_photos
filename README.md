== README

### TODOS

* get rid of `paperclip` gem
* add `aws-sdk` gem

### A quick hashing out of models

``` ruby
class Photo
  attr_accessor :filename, :s3_url, :height, :width

  has_many :people, through: :appearances
end

class Person
  attr_accessor :first_name, :last_name

  has_many :photos, through: :appearances
end

class Appearance
  attr_accessor :in_focus

  belongs_to :photo
  belongs_to :person
end
```

* Ruby version 2.3.1

* Database: sqlite3 for dev & test, pg for prod

* How to run the test suite
`bin/rspec` or on an ongoing basis with `guard`
