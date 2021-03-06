class UsersController < ApplicationController
	def index
		@users = User.all
		render json: @users
	end

	def new
	end

	def create
		@user = User.new(user_params)

		if @user.save
			sign_in(@user)
			redirect_to root_url
		else
			flash.now[:errors] = @user.errors.full_messages
      		render :new, status: 422
		end
	end

	private

	def user_params
		params.require(:user).permit(:username, :password)
	end
end
