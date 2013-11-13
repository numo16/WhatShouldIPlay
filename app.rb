require "sinatra"
require "json"
require "steam-condenser"

set :protection, :except => [:http_origin]

get '/' do
	send_file File.join(settings.public_folder, 'index.html')
end

post '/games' do
	params = JSON.parse request.body.read.to_s
	username = params['username']

	puts "Username: #{username}"

	if username.empty?
		{:error => 'steam username was blank. please enter your steam username'}.to_json
	else
		id = SteamId.new username

		gamesHash = id.games

		games = {:count => gamesHash.count}

		gamesHash.each do |id, game|
			games[game.app_id] = {:name => game.name, :image_url => game.logo_url}
		end

		games.to_json
	end
end