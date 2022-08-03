require 'rails_helper'

feature "when the user submits a new sauce" do
  scenario 'user successfully creates a new sauce' do
    visit new_sauce_path

    fill_in 'Name', with: 'Mustard'
    fill_in 'Brand', with: "French's"
    fill_in 'Image URL', with: "https://d1e3z2jco40k3v.cloudfront.net/-/media/project/oneweb/mccormick-us/frenchs/products/00041500000251_a1c1_master.png?rev=9435c3cef1e047fc95a866041365f722&vd=20220421T205701Z&hash=731B4BC0C06519DDEE3FD30810F935F5"
    fill_in 'Description', with: "THE yellow mustard"

    click_button 'Create Sauce'

    expect(page).to have_content("Mustard")
    expect(page).to have_content("French's")
    expect(page).to have_content("You successfully added that sauce.")    
  end

  scenario "user fails to add a new sauce" do
    visit new_sauce_path
    
    click_button 'Create Sauce'

    expect(page).to have_content("Name can't be blank")
    expect(page).to have_content("Brand can't be blank")
    expect(page).to have_content("Image url can't be blank")
    expect(page).to have_content("Image url is not a valid URL")
  end
end