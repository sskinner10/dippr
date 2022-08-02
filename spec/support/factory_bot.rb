require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
  end
end 

FactoryBot.define do
  factory :sauce do
    name { "Ketchup" }
    brand { "Heinz" }
    image_url { "https://m.media-amazon.com/images/I/71szc59Y0aL._SL1500_.jpg" }
    description { "a tasty, tomato based sauce" }
  end
end