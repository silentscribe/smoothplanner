module Api::V1
  class TripsController < ApplicationController
    def index
    end

    def show
      @trip = Trip.find(params[:id])
      @items = @trip.items.order(:time_start)
      render json: @items
    end

    def create
      newtrip = Trip.new(trip_params)
      newtrip.save
    end

    def destroy
      @trip = Trip.find(params[:id])
      temp_user = @trip.user_id

      if @trip.destroy
        @user = User.find(temp_user)
        @trips = Trip.where(user_id:@user).order(:time_start)
        render json: @trips
      else
        render json: @trip.errors, status: :unprocessable_entity
      end
    end

    private
    def trip_params
      params.require(:trip).permit(:name, :user_id)
    end
  end
end