module ApplicationHelper
  def asset_url(name)
    root_url + (assets_manifest[name] || name)
  end

  def assets_manifest
    if not @assets_manifest
      path = Rails.root.join('public', 'manifest.json')
      @assets_manifest = File.exist?(path) ? JSON.parse(File.read(path)) : {}
    end

    @assets_manifest
  end
end
