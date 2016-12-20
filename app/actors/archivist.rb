class Archivist
  # Usage:
  #   Archivist.new(foo).zipping(a_bunch_of_files, 'cool_folder') do |filename_dot_zip, zipped_data|
  #     do_stuff_with_zip_file
  #   end
  def zipping(filenames, folder_name)
    tempfile_name = "#{folder_name}.zip"
    tempfile = Tempfile.new(tempfile_name)

    begin
      # First, initialize the temp file as a zip file
      Zip::OutputStream.open(tempfile) { |zos| }

      # Now it can be filled with stuff and zipped
      Zip::File.open(tempfile.path, Zip::File::CREATE) do |zip|
        filenames.each do |filename|
          # For each filename, write to a separate file in the archive of the same name
          zip.get_output_stream(filename) do |os|
            # And set the file to hold the photo from s3
            @filestream_writer.call(filename, os)
          end
        end
      end

      #Read the binary data from the file
      zipped_photos = File.read(tempfile.path)

      # And hand the filename and archive data off to calling code
      yield(tempfile_name, zipped_photos)
    ensure
      tempfile.close
      tempfile.unlink
    end
  end

  # filestream_writer :: ->(filename, stream) { stream.write foo(filename) }
  def initialize(filestream_writer)
    @filestream_writer = filestream_writer
  end
end
