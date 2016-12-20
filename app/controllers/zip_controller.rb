class ZipController < ApplicationController
  DEFAULT_ZIPFILE_NAME = 'PhotosFromAlexAndAudrey'.freeze

  # PARAMS
  #   photo_ids :: [FixNum]
  #   size :: :small | :medium | :full
  #   folder_name :: String
  def download
    selected_photos = params[:selected_photos]
    zipfile_name = params[:zip_filename] || DEFAULT_ZIPFILE_NAME

    paparazzo = PhotoFetcher.new(photo_ids: selected_photos, size: :medium)
    archie    = Archivist.new(paparazzo.filestream_writer)

    archie.zipping(paparazzo.filenames, zipfile_name) do |filename, zipfile|
      send_data(zipfile, :type => 'application/zip', :filename => filename)
    end
  end
end
