require 'factory_bot'
include ActionDispatch::TestProcess


FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    dippr_handle { 'BigDipper' }
    avatar { fixture_file_upload("#{Rails.root}/spec/support/images/unicorn.jpeg", "image/jpeg") }
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

FactoryBot.define do
  factory :review do
    title { "Delicious sauce" }
    rating { 5 }
    heatIndex { 0 }
    body { "it's delicious." }
    sauce
  end
end

FactoryBot.define do
  factory :vote do
    vote_type { 1 }
  end
end