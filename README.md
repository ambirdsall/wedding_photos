# Alex and Audrey Birdsall wedding photos
### a front-end photo gallery
With a performant (it's just a linked list and vanilla js), keyboard-navigable
modal view; and the ability to either download medium-resolution copies of any
photo or select a set of photo ids and POST them to

### a back-end file-zipping and -streaming endpoint
which takes a list of photo ids, fetches the corresponding full-resolution
photos from s3, and streams the data into a compressed archive for faster
download.

### TODOS

#### first

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

#### then
* optimize download speed
  I believe six open sockets per page is the standard, so particularly large zip
  photosets would download fastest if split into up to 5 or 6 (TODO: verify) zip files for
  parallel downloading.
* unless it's terrible for the user
  I mean, as a user, having to open a bunch of zip files and then collate them
  all in whatever destination directory you wanted in your OS's GUI sounds like a
  bigger nuisance than a long download.

#### then
* Any subset of `photo.people` can be in focus except the empty set: at least
  one person must be in focus.
* Photos can be filtered by the people they contain, either by `first_name && last_name` or `last_name`

## How to run the test suite
`bin/rspec` or, better, `bin/guard`
