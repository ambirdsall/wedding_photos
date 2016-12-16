class ZipController < ApplicationController
  # PARAMS
  #   photo_ids :: [int]
  #   size :: :small | :medium | :full
  def photos
    paparazzo = PhotoFetcher.new(photo_ids: [112, 455], size: :medium)
    archie    = Archivist.new(paparazzo.filestream_writer)

    archie.zipping(paparazzo.filenames) do |filename, zipfile|
      send_data(zipfile, :type => 'application/zip', :filename => filename)
    end
  end
end
