bits = [
  'bargraph',
  'bend-sensor',
  'branch',
  'bright-led',
  'button',
  'buzzer',
  'coin-battery',
  'dc-motor',
  'dimmer',
  'doubleand',
  'doubleor',
  'fan',
  'forkinverter',
  'led',
  'light-sensor',
  'light-trigger',
  'light-wire',
  'long-led',
  'motion-trigger',
  'power',
  'pressure-sensor',
  'pulse',
  'rgb-led',
  'roller-switch',
  'servo-motor',
  'slide-dimmer',
  'slide-switch',
  'sound-trigger',
  'temperature-sensor',
  'timeout',
  'toggle-switch',
  'usb-power',
  'uv-led',
  'vibration-motor',
  'wire'
]

random_material_names = [
  'paper',
  'pencil',
  'stapler',
  'construction_paper',
  'wood',
  'gold',
  'silver',
  'diamonds',
  'stone',
  'blood',
  'sweat',
  'tears'
]

bits.each do |bit|
  Bit.create(name: bit)
end

all_bit_ids = Bit.all.pluck(:id)

inventions = [
  Invention.new(title: 'Toy Car', description: 'It moves stuff', user_name: 'Zack', email: 'zack@zack.com'),
  Invention.new(title: 'Helicopter', description: 'It flies!', user_name: 'Zack', email: 'zack@zack.com'),
  Invention.new(title: 'Robot', description: 'Future overlord', user_name: 'Ben'),
  Invention.new(title: 'Lightbulb', description: 'Pretty important', email: 'Edison@gmail.com')
]

inventions.each do |invention|
  num_bits = (1..5).to_a.sample
  num_materials = (0..5).to_a.sample

  bit_ids = all_bit_ids.sample(num_bits)
  material_names = random_material_names.sample(num_materials)

  invention.invention_bits_attributes = (0..(num_bits - 1)).inject({}) do |h, num|
    h.merge({
      num => { bit_id: bit_ids[num] }
    })
  end

  invention.invention_materials_attributes = (0..(num_materials - 1)).inject({}) do |h, num|
    h.merge({
      num => {
        material_attributes: { name: material_names[num] }
      }
    })
  end

  invention.save!
end

