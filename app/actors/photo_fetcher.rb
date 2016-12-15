# Gets photos, in this case from S3
class PhotoFetcher
  BUCKET = 'alexandaudrey.com'.freeze
  REGION = 'us-east-1'.freeze
  SIZES = {
    small:  's',
    medium: 'm',
    full:   ''
  }.freeze

  def initialize(photo_ids: [], size: :medium)
    @filenames = photo_ids.map { |id| "Audrey-Alex-Wedding-#{id}#{SIZES[size]}.jpg" }
  end
  attr_reader :filenames

  # Returns a lambda to be called when there's a zipfile output stream open
  def filestream_writer
    lambda do |filename, stream|
      s3.get_object(bucket: BUCKET, key: "wedding_photos/#{filename}") do |chunk|
        stream.write(chunk)
      end
    end
  end

  def s3
    @s3 ||= Aws::S3::Client.new(region: REGION)
  end
end
