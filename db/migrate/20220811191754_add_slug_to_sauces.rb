class AddSlugToSauces < ActiveRecord::Migration[5.2]
  def change
    add_column :sauces, :slug, :string
    add_index :sauces, :slug, unique: true
  end
end
