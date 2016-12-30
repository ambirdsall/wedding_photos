# Gets photos, in this case from S3
class PhotoFetcher
  SIZES = {
    thumb:  't',
    small:  's',
    medium: 'm',
    full:   ''
  }.freeze
  BUCKET = 'alexandaudrey.com'.freeze
  REGION = 'us-east-1'.freeze
  S3 = Aws::S3::Client.new(region: REGION).freeze
  FILESTREAM_WRITER = lambda do |filename, stream|
    S3.get_object(bucket: BUCKET, key: "wedding_photos/#{filename}") do |chunk|
      stream.write(chunk)
    end
  end.freeze

  def initialize(photo_ids: [], size: :medium)
    @filenames = photo_ids.map { |id| "Audrey-Alex-Wedding-#{id}#{SIZES[size]}.jpg" }
  end
  attr_reader :filenames
end
