def photo_ids
  # Missing photo ids acquired by running the following shell command in my local photos directory:
  # ls | ruby -e '
  # files = []
  # STDIN.each {|l| files.push l}
  # counts = (1..545).to_a
  # puts counts.reject { |c| files.any? { |f| f =~ %r{-#{c}.jpg} } }
  # '
  #
  # Where the magic 545 came from running in the same directory:
  # ls | ruby -e 'files = []; STDIN.each {|f| files << f}; files.each { |f| puts f[/\d+/] }' | sort -g | tail -n 1
  missing_photo_ids = [
    111,
    157,
    159,
    241,
    242,
    248,
    260,
    265,
    316,
    317,
    327,
    338,
    346,
    347,
    354,
    375,
    380,
    381,
    382,
    389
  ]

  @photo_ids ||= (1..545).to_a - missing_photo_ids
end

photo_ids.each do |id|
  begin
    print "id: #{id}\t"
    Photo.find_or_create_by id: id
    puts "[x]"
  rescue => e
    puts "[ ]"
    raise e
  end
end
