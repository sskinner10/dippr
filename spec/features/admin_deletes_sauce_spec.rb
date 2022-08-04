require "rails_helper"

feature "when a user deletes a sauce" do
  scenario "a user who is an admin successfully deletes a sauce" do
    sauce = FactoryBot.create(:sauce)
    user = FactoryBot.create(:user, 
      role: 'admin'  
    )

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Log in'

    visit edit_sauce_path(sauce)

    click_link "Obliterate this Sauce"

    expect(page).to have_content("Sauce obliterated. The sauce is lost.")

  end
end