module Admp
  class Server
    include Mongoid::Document
    include Mongoid::Timestamps

    field :client_id, type: String
    field :client_secret, type: String
    field :state, type: String
    field :url, type: String

    validates :url, presence: true

    index({ url: 1 }, { unique: true, name: 'url_index' })
    index({ state: 1 }, { unique: true, name: 'state_index' })

    def registered?
      not (self.client_id.blank? or self.client_secret.blank?)
    end
  end
end
