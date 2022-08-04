require "rails_helper"

feature "when a user deletes a sauce" do
  scenario "a user who is an admin successfully deletes a sauce" do
    sauce = FactoryBot.create(:sauce)
    user = FactoryBot.create(:user, 
      role: 'admin'  
    )

    login_as(user)

    visit edit_sauce_path(sauce)

    click_link "Obliterate this Sauce"

    expect(page).to have_content("Sauce obliterated. The sauce is lost.")

  end
end