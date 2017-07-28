class InventionsController < ApplicationController

  def index
    render json: Invention.all
  end

  def new
    @bits = Bit.all.map { |bit| { id: bit.id, name: bit.name } }
  end

  def create
    if invention = Invention.create(invention_params)
      render json: invention
    else
      render json: invention.errors, status: :unprocessable_entity
    end
  end

  private

    def invention_params
      params.require(:invention).permit(:title, :description, :user_name, :email, invention_bits_attributes: [:bit_id], invention_materials_attributes: [material_attributes: [:name]])
    end

end