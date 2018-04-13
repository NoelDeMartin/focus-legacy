module Admp
  class Service
    include Mongoid::Document
    include Mongoid::Timestamps

    field :client_id, type: String
    field :client_secret, type: String
    field :state, type: String
    field :root_uri, type: String

    validates :root_uri, presence: true

    index({ root_uri: 1 }, { unique: true, name: 'root_uri_index' })
    index({ state: 1 }, { unique: true, name: 'state_index' })
  end
end
