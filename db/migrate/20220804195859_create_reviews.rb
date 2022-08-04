class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.string :title, null: false
      t.integer :rating, null: false
      t.integer :heatIndex, null: false
      t.text :body, default: ""
      t.belongs_to :sauce, null: false
      t.timestamps null: false
    end
  end
end
