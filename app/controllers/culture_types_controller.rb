# frozen_string_literal: true

class CultureTypesController < ActionController::Base
  def create
    @culture_type = CultureType.new(culture_type_params)

    if @culture_type.save
      render json: serialize(@culture_type).serialized_json, status: :created
    else
      render json: { errors: @culture_type.errors }, status: :unprocessable_entity
    end
  end

  private

  def culture_type_params
    params.permit(:name)
  end
end
