== README
### A quick hashing out of models
  event -|< groups 0|< attendees

  event:
    [uuid] ?host
    [int] max_groups_count (default/minimum = 1)
    [int] min_groups_count (default/minimum = 1)
    [datetime] date
    [datetime] rsvp_by
  group:
    [uuid] event
    [int] min_size
    [int] max_size
  (attendee):
    !!! how to handle host's optional status as attendee? !!!
    [uuid] group -> event
    ??? [bool] should_remind
    ??? [datetime] remind_at

* Ruby version 2.1.5

* System dependencies

* Configuration

* Database: sqlite3 for dev & test, pg for prod

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions
