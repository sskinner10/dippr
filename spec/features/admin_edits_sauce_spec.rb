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

  scenario "user who is an admin can click the 'Edit Sauce' link" do
    FactoryBot.create(:sauce)
    user = FactoryBot.create(:user, 
      role: 'admin'  
    )

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Log in'

    click_link 'Edit Sauce'

    expect(page).to have_content("Edit this sauce:")
  end

  scenario "user who is an admin successfully edits a sauce" do
    sauce = FactoryBot.create(:sauce)
    user = FactoryBot.create(:user, 
      role: 'admin'  
    )

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Log in'

    visit edit_sauce_path(sauce)

    fill_in 'Name', with: 'Mustard'
    fill_in 'Brand', with: "French's"
    fill_in 'Image URL', with: "https://d1e3z2jco40k3v.cloudfront.net/-/media/project/oneweb/mccormick-us/frenchs/products/00041500000251_a1c1_master.png?rev=9435c3cef1e047fc95a866041365f722&vd=20220421T205701Z&hash=731B4BC0C06519DDEE3FD30810F935F5"
    fill_in 'Description', with: "THE yellow mustard"

    click_button "Update Sauce"

    expect(page).to have_content("Mustard")
    expect(page).to have_content("French's")
    expect(page).to have_content("Sauce updated successfully")
  end
end