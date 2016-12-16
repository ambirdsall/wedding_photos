source 'https://rubygems.org'
ruby '2.3.1'

gem 'aws-sdk'
gem 'rubyzip'

gem 'rails', '4.2.5'

gem 'sass-rails', '~> 5.0'
gem 'slim-rails'
gem 'sqlite3'
gem 'uglifier', '>= 1.3.0'

# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby
# gem 'browserify-rails'

gem 'jbuilder', '~> 2.0'
gem 'jquery-rails'
gem 'sdoc', '~> 0.4.0', group: :doc
gem 'turbolinks'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  gem 'byebug'
  gem 'guard-rspec'
  gem 'pry-rails'
  gem 'rb-fsevent' if `uname` =~ /Darwin/
  gem 'rspec-rails'
  gem 'spring-commands-rspec'
end

group :test do
  gem 'capybara'
  gem 'factory_girl_rails'
  gem 'shoulda-matchers'
end

group :development do
  gem 'annotate'
  gem 'spring'
  gem 'web-console', '~> 2.0'
end

