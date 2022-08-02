require 'rails_helper'

feature 'when a user visits index page' do
  scenario 'user sees all the sauces' do
    ketchup = FactoryBot.create(:sauce)
    mustard = FactoryBot.create(:sauce, 
        name: "Mustard", 
        brand: "French's", 
        image_url: "https://d1e3z2jco40k3v.cloudfront.net/-/media/project/oneweb/mccormick-us/frenchs/products/00041500000251_a1c1_master.png?rev=9435c3cef1e047fc95a866041365f722&vd=20220421T205701Z&hash=731B4BC0C06519DDEE3FD30810F935F5",
        description: "the ultimate companion to ketchup"
    )

    visit sauces_path

    expect(page).to have_content(ketchup.name)
    expect(page).to have_content(ketchup.brand)
    expect(page).to have_content(mustard.name)
    expect(page).to have_content(mustard.brand)
  end
end