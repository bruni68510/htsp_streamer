module HTSP
  class HMF_Bin
    attr_reader :str
    def initialize(str)
      @str = str
    end
  end

  class Message
    attr_reader :params

    HMF_MAP  = 1
    HMF_S64  = 2
    HMF_STR  = 3
    HMF_BIN  = 4
    HMF_LIST = 5

    def initialize(params = {})
      @params = params
    end

    def serialize
      return int2bin(binary_count_message(@params)) + binary_write(@params)
    end

    def load_raw(data)
      @params = deserialize(data)
      self
    end

    protected

    def int2bin(i)
      (i >> 24 & 0xFF).chr + (i >> 16 & 0xFF).chr + (i >> 16 & 0xFF).chr + (i & 0xFF).chr
    end

    def bin2int(d)
      (d[0].ord << 24) +
        (d[1].ord << 16) +
        (d[2].ord << 8) +
        d[3].ord
    end

    def binary_count_message(msg)
      ret = 0
      msg.each_pair do |k, v|
        ret = ret + 6
        ret = ret + k.to_s.length + binary_count_value(v)
      end
      ret
    end

    def binary_count_value(value)
      if value.is_a? String
        value.length
      elsif value.is_a? Integer
        ret = 0
        while value > 0 do
          ret = ret + 1
          value = value >> 8
        end
        ret
      elsif value.is_a? HTSP::HMF_Bin
        value.str.length
      else
        raise 'Invalid Type!'
      end
    end

    def binary_write(message)
      binary_message = ''
      message.each_pair do |k, v|
        binary_message << (hmf_type(v)).chr
        binary_message << (k.length & 0xFF).chr

        l = binary_count_value(v)
        binary_message << int2bin(l)
        binary_message << k.to_s

        if v.is_a? String
          binary_message << v
        elsif v.is_a? Integer
          while v > 0 do
            binary_message << (v & 0xFF).chr
            v = v >> 8
          end
        elsif v.is_a? HTSP::HMF_Bin
          binary_message << v.str
        else
          raise 'Invalid Type!'
        end
      end

      binary_message
    end

    def deserialize(data)
      msg = {}

      while data.length > 5
        type = data[0].ord
        nlen = data[1].ord
        data_length = bin2int(data[2..5])
        data = data[6..-1]

        #raise 'not enough data' if len < nlen + dlen

        name = data[0..nlen-1]
        data = data[nlen..-1]

        if type == HMF_STR
          item = data[0..data_length-1]
        elsif type == HMF_BIN
          item = hmf_bin(data[0..data_length-1])
        elsif type == HMF_S64
          item = 0
          i = data_length - 1
          while i >= 0
            item = (item << 8) | data[i].ord
            i = i - 1
          end
        elsif type == HMF_MAP
          item = deserialize data[0..data_length-1]
        elsif type == HMF_LIST
          item = deserialize_array data[0..data_length-1]
        end

        msg[name] = item
        data = data[data_length..-1]
      end

      msg
    end

    def deserialize_array(data)
      items = []

      while data.length > 5
        type = data[0].ord
        nlen = data[1].ord
        data_length = bin2int(data[2..5])
        data = data[6..-1]

        name = data[0..nlen-1]
        data = data[nlen..-1]

        if type == HMF_STR
          item = data[0..data_length-1]
        elsif type == HMF_BIN
          item = hmf_bin(data[0..data_length-1])
        elsif type == HMF_S64
          item = 0
          i = data_length - 1
          while i >= 0
            item = (item << 8) | data[i].ord
            i = i - 1
          end
        elsif type == HMF_MAP
          item = deserialize data[0..data_length-1]
        elsif type == HMF_LIST
          item = deserialize_array data[0..data_length-1]
        end

        items << item
        data = data[data_length..-1]
      end

      items
    end

    def hmf_type(value)
      if value.is_a? String
        HMF_STR
      elsif value.is_a? Integer
        HMF_S64
      elsif value.is_a? HTSP::HMF_Bin
        HMF_BIN
      end
    end

    def hmf_bin(str)
      str
    end
  end
end
