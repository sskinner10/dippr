require 'rails_helper'

feature 'when a user visits index page' do
  scenario 'user sees all the sauces' do
    ketchup = FactoryBot.create(:sauce)
    mustard = FactoryBot.create(:sauce, 
        name: "Mustard", 
        brand: "French's", 
        image_url: fixture_file_upload("#{Rails.root}/spec/support/images/unicorn.jpeg", "image/jpeg"),
        description: "the ultimate companion to ketchup"
    )

    visit sauces_path

    expect(page).to have_content(ketchup.name)
    expect(page).to have_content(ketchup.brand)
    expect(page).to have_content(mustard.name)
    expect(page).to have_content(mustard.brand)
  end
end