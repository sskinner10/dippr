require "rails_helper"

feature "when a user edits a sauce" do
  scenario "user who is not an admin cannot see the 'Edit Sauce' link" do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Log in'

    expect(page).not_to have_link("Edit Sauce")
  end

  context "user who is an admin" do
    scenario "can click the 'Edit Sauce' link" do
      FactoryBot.create(:sauce)
      user = FactoryBot.create(:user, 
        role: 'admin'
      )

      login_as(user)

      visit sauces_path

      click_link 'Edit Sauce'

      expect(page).to have_content("Edit this sauce:")
    end

    scenario "successfully edits a sauce" do
      sauce = FactoryBot.create(:sauce)
      user = FactoryBot.create(:user, 
        role: 'admin'  
      )

      login_as(user)

      visit edit_sauce_path(sauce)

      fill_in 'Name', with: 'Mustard'
      fill_in 'Brand', with: "French's"
      attach_file "Image URL", "#{Rails.root}/spec/support/images/unicorn.jpeg"
      fill_in 'Description', with: "THE yellow mustard"

      click_button "Update Sauce"

      expect(page).to have_content("Mustard")
      expect(page).to have_content("French's")
      expect(page).to have_content("Sauce updated successfully")
    end

    scenario "fails to edit a sauce" do
      sauce = FactoryBot.create(:sauce)
      user = FactoryBot.create(:user, 
        role: 'admin'  
      )

      login_as(user)

      visit edit_sauce_path(sauce)

      fill_in 'Name', with: ""
      fill_in 'Brand', with: ""
      fill_in 'Description', with: ""

      click_button "Update Sauce"

      expect(page).to have_content("can't be blank")
    end
  end
end