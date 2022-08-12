require 'rails_helper'

feature "when the user submits a new sauce" do
  scenario 'user successfully creates a new sauce' do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Log in'

    visit new_sauce_path

    fill_in 'Name', with: 'Mustard'
    fill_in 'Brand', with: "French's"
    attach_file "Image URL", "#{Rails.root}/spec/support/images/unicorn.jpeg"
    fill_in 'Description', with: "THE yellow mustard"

    click_button 'Create Sauce'

    expect(page).to have_content("Mustard")
    expect(page).to have_content("French's")
    expect(page).to have_content("You successfully added that sauce.")    
  end

  scenario "user fails to add a new sauce" do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Log in'

    visit new_sauce_path
    
    click_button 'Create Sauce'

    expect(page).to have_content("can't be blank")
  end
end