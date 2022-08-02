class CreateSauces < ActiveRecord::Migration[5.2]
  def change
    create_table :sauces do |t|
      t.string :name, null: false
      t.string :brand, null: false
      t.text :image_url, null: false
      t.text :description

      t.index [:name, :brand], unique: true

      t.timestamps null: false
    end
  end
end
