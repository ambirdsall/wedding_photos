class Archivist
  ZIPFILE_NAME = 'PhotosFromAlexAndAudrey'.freeze

  # Usage:
  #   Archivist.new(foo).zipping(a_bunch_of_files, 'cool_folder') do |filename_dot_zip, zipped_data|
  #     do_stuff_with_zip_file
  #   end
  def zipping(filenames, folder_name = ZIPFILE_NAME)
    temp_file = Tempfile.new("#{folder_name}.zip")

    begin
      # First, initialize the temp file as a zip file
      Zip::OutputStream.open(temp_file) { |zos| }

      # Now it can be filled with stuff and zipped
      Zip::File.open(temp_file.path, Zip::File::CREATE) do |zip|
        filenames.each do |filename|
          # For each filename, write to a separate file in the archive of the same name
          zip.get_output_stream(filename) do |os|
            # And set the file to hold the photo from s3
            @filestream_writer.call(filename, os)
          end
        end
      end

      #Read the binary data from the file
      zipped_photos = File.read(temp_file.path)

      # And hand the filename and archive data off to calling code
      yield(ZIPFILE_NAME, zipped_photos)
    ensure
      temp_file.close
      temp_file.unlink
    end
  end

  # filestream_writer :: ->(filename, stream) { stream.write foo(filename) }
  def initialize(filestream_writer)
    @filestream_writer = filestream_writer
  end
end
