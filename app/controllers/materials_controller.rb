class MaterialsController < ApplicationController

  def index
    materials = Material.where('name ilike ?', "%#{params[:query]}%").limit(10)
    render json: materials
  end

end