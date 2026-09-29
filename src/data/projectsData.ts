export interface ComponentItem {
  name: string;
  quantity: number | string;
  purpose: string;
}

export interface WiringStep {
  step: number;
  from: string;
  to: string;
  wireColor: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  badge: string;
  category: string;
  date: string;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  thumbnail: string;
  circuitImage: string;
  circuitBreadboardImage: string;
  videoSrc: string;
  components: ComponentItem[];
  wiringSteps: WiringStep[];
  theoryTitle: string;
  theoryContent: {
    heading: string;
    body: string[];
    formula?: string;
    formulaBreakdown?: { symbol: string; meaning: string; value: string }[];
    truthTable?: {
      headers: string[];
      rows: (string | number)[][];
    };
  };
  codeFileName: string;
  code: string;
  whatILearned: string[];
  beginnerTips: { title: string; tip: string }[];
  githubFolderUrl: string;
}

export const projectsData: Project[] = [
  {
    id: "led-blink",
    title: "LED Blink — Digital Output & Ohm's Law",
    badge: "Project 01",
    category: "Fundamental Digital Electronics",
    date: "September 2026",
    shortDescription: "The essential hardware 'Hello World' — driving an external LED through digital pin 13 with precise 1-second pulse intervals and current-limiting resistor calculations.",
    fullDescription: "The foundational milestone of embedded systems. This project explores digital output GPIO pins, square-wave timing cycles, and the physical electronics principles required to safely drive semiconductors without burning out microcontroller pins.",
    tags: ["Digital I/O", "Ohm's Law", "Current Limiting", "Breadboard Basics", "Arduino Uno"],
    thumbnail: "/images/led-blink-breadboard.jpg",
    circuitImage: "/images/led-blink-circuit.png",
    circuitBreadboardImage: "/images/led-blink-breadboard.jpg",
    videoSrc: "/videos/led-blink-demo.mp4",
    components: [
      { name: "Arduino Uno R3 (or compatible)", quantity: 1, purpose: "Microcontroller board providing 5V logic & timing control" },
      { name: "Red 5mm LED", quantity: 1, purpose: "Light emitting diode (forward voltage ~2.0V, max current 20mA)" },
      { name: "220Ω Resistor (1/4W)", quantity: 1, purpose: "Current-limiting resistor to protect LED and ATmega328P pin" },
      { name: "Half-Size Solderless Breadboard", quantity: 1, purpose: "Prototyping grid with interconnected tie-point columns" },
      { name: "Male-to-Male Jumper Wires", quantity: 2, purpose: "Red for Digital Pin 13 signal, Black for Ground connection" },
      { name: "USB Type-A to Type-B Cable", quantity: 1, purpose: "Power supply and serial flashing from computer" }
    ],
    wiringSteps: [
      {
        step: 1,
        from: "Arduino Pin 13",
        to: "Breadboard Row (Anode connection)",
        wireColor: "Red wire",
        description: "Connect a jumper wire from Arduino digital pin 13 to a breadboard tie row. Pin 13 alternates between +5V (HIGH) and 0V (LOW)."
      },
      {
        step: 2,
        from: "Breadboard Signal Row",
        to: "Resistor Input Lead",
        wireColor: "Resistor (220Ω)",
        description: "Insert one lead of the 220Ω resistor into the signal row. Resistors are non-polarized, so orientation does not matter."
      },
      {
        step: 3,
        from: "Resistor Output Lead",
        to: "LED Anode (Long Leg / +)",
        wireColor: "Direct Lead",
        description: "Place the LED's longer positive lead (anode) in the same breadboard column as the resistor's second lead. Current enters through here."
      },
      {
        step: 4,
        from: "LED Cathode (Short Leg / −)",
        to: "Breadboard Ground Row",
        wireColor: "Direct Lead",
        description: "Place the LED's shorter flat-edge negative lead (cathode) into an adjacent row or the blue ground rail."
      },
      {
        step: 5,
        from: "Breadboard Ground Row",
        to: "Arduino GND Pin",
        wireColor: "Black wire",
        description: "Run a black jumper wire from the cathode row back to one of the Arduino's GND header pins to complete the circuit loop."
      }
    ],
    theoryTitle: "Ohm's Law & Current-Limiting Resistor Calculation",
    theoryContent: {
      heading: "Why a 220Ω Resistor? (Mathematical Derivation)",
      body: [
        "Light Emitting Diodes are non-linear semiconductor devices. Unlike resistors, once the forward threshold voltage (Vf) is crossed, an LED exhibits near-zero dynamic resistance. Without a resistor in series, the circuit will draw infinite theoretical current until either the LED burns out or the Arduino's ATmega328P output pin is permanently destroyed (the microcontroller pin absolute maximum rating is 40mA).",
        "To protect both components, we apply Ohm's Law (V = I × R) across the resistor to clamp the current to a safe operating level of approximately 13.6mA to 15mA."
      ],
      formula: "R = (V_supply - V_forward) / I_desired",
      formulaBreakdown: [
        { symbol: "V_supply", meaning: "Arduino Uno GPIO Output Voltage", value: "5.0 V" },
        { symbol: "V_forward (Vf)", meaning: "Forward Voltage Drop of Red 5mm LED", value: "2.0 V (typical)" },
        { symbol: "V_resistor", meaning: "Voltage drop absorbed across resistor (5V - 2V)", value: "3.0 V" },
        { symbol: "I_desired", meaning: "Safe continuous operating current", value: "0.015 A (15 mA)" },
        { symbol: "R_calculated", meaning: "Ideal resistance = 3.0V / 0.015A", value: "200 Ω" },
        { symbol: "R_chosen", meaning: "Standard E12 series nearest value", value: "220 Ω (yielding ~13.6 mA)" }
      ]
    },
    codeFileName: "led_blink.ino",
    code: `/*
 * LED Blink — Basic Digital Output
 * 
 * Turns an external LED on and off at a 1-second interval
 * using digital pin 13 and a 220Ω current-limiting resistor.
 * 
 * Circuit:
 *   Pin 13 → 220Ω resistor → LED anode (+)
 *   LED cathode (−) → GND
 * 
 * Note: Source code reconstructed for portfolio documentation.
 *       The original .ino file was not found on this system.
 * 
 * Hardware Lab: ECE & Robotics Learning Platform
 * Date:   September 2026
 */

const int LED_PIN = 13;          // Digital pin connected to the LED circuit
const int BLINK_DELAY_MS = 1000; // Delay between ON/OFF transitions (milliseconds)

void setup() {
  // Configure LED_PIN as a digital output so we can drive it HIGH or LOW
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);   // Supply 5 V to pin 13 → LED turns ON
  delay(BLINK_DELAY_MS);         // Hold the ON state for 1 second

  digitalWrite(LED_PIN, LOW);    // Pull pin 13 to 0 V → LED turns OFF
  delay(BLINK_DELAY_MS);         // Hold the OFF state for 1 second
}`,
    whatILearned: [
      "Microcontroller GPIO pins have strict current sourcing limits (max 40mA per pin, recommended 20mA max). Safe hardware design always starts with protecting the chip.",
      "An LED is non-ohmic; its forward voltage drop must always be subtracted from the supply voltage before calculating the current-limiting resistor value.",
      "Breadboard internal routing works in tied columns of 5 holes separated by a center divider trench, while power rails run horizontally along the sides.",
      "Embedded C++ loop() runs continuously, generating an intentional 0.5 Hz square-wave pulse when paired with delay(1000)."
    ],
    beginnerTips: [
      {
        title: "Watch LED Polarity",
        tip: "LEDs only conduct current in one direction. The longer lead is the Anode (+), and the shorter lead with the flat notch on the plastic bulb rim is the Cathode (−). If plugged backwards, no current flows and the LED will not illuminate."
      },
      {
        title: "Never Skip the Resistor",
        tip: "Connecting an LED directly between Pin 13 and GND without a resistor will momentarily shine very bright and then burn out, potentially frying the internal output transistor of your Arduino pin."
      },
      {
        title: "Ensure Full Breadboard Seating",
        tip: "Jumper wires and component leads must push in firmly past initial friction. Intermittent loose connections are the #1 source of beginner debugging headaches."
      }
    ],
    githubFolderUrl: "https://github.com/A-941/arduino-robotics-journey/tree/main/01-led-blink"
  },
  {
    id: "binary-counter",
    title: "4-LED Binary Counter — Bitwise Logic & Multi-Pin Control",
    badge: "Project 02",
    category: "Digital Logic & Embedded Computation",
    date: "September 2026",
    shortDescription: "Counts cyclically from 0 to 15 (0000 to 1111 in binary) across 4 LEDs using dynamic bitwise shifting and bitmasking algorithms in C++.",
    fullDescription: "Bridging pure computer science theory and physical hardware. This project transforms abstract binary numbers and bitwise operators (>> and &) into visible physical states on a breadboard, illustrating how digital computers represent numbers using voltage highs and lows.",
    tags: ["Binary Logic", "Bitwise Operators", "Array Iteration", "Digital Output", "Truth Tables", "Arduino Uno"],
    thumbnail: "/images/binary-counter-breadboard.jpg",
    circuitImage: "/images/binary-counter-circuit.png",
    circuitBreadboardImage: "/images/binary-counter-breadboard.jpg",
    videoSrc: "/videos/binary-counter-demo.mp4",
    components: [
      { name: "Arduino Uno R3", quantity: 1, purpose: "Microcontroller running the counting loop and bit extraction" },
      { name: "Colored LEDs (5mm)", quantity: 4, purpose: "Bits 0, 1, 2, 3 (e.g. Red, Green, Yellow, Blue)" },
      { name: "220Ω Resistors (1/4W)", quantity: 4, purpose: "One dedicated current-limiting resistor per LED" },
      { name: "Half-Size Solderless Breadboard", quantity: 1, purpose: "Prototyping platform with shared ground bus" },
      { name: "Male-to-Male Jumper Wires", quantity: 6, purpose: "4 signal wires (pins 2, 3, 4, 5) + 1 GND wire + 1 rail jumper" },
      { name: "USB Type-A to Type-B Cable", quantity: 1, purpose: "Power and programming interface" }
    ],
    wiringSteps: [
      {
        step: 1,
        from: "Arduino GND",
        to: "Breadboard Negative Rail (−)",
        wireColor: "Black wire",
        description: "Connect Arduino GND to the negative blue bus strip running along the breadboard edge to establish a common ground reference."
      },
      {
        step: 2,
        from: "Arduino Pin 2 (LSB - Bit 0)",
        to: "Resistor 1 → LED 0 Anode",
        wireColor: "Yellow wire",
        description: "Connect digital pin 2 to the 220Ω resistor feeding LED 0 (representing 2^0 = value 1)."
      },
      {
        step: 3,
        from: "Arduino Pin 3 (Bit 1)",
        to: "Resistor 2 → LED 1 Anode",
        wireColor: "Green wire",
        description: "Connect digital pin 3 to the 220Ω resistor feeding LED 1 (representing 2^1 = value 2)."
      },
      {
        step: 4,
        from: "Arduino Pin 4 (Bit 2)",
        to: "Resistor 3 → LED 2 Anode",
        wireColor: "Blue wire",
        description: "Connect digital pin 4 to the 220Ω resistor feeding LED 2 (representing 2^2 = value 4)."
      },
      {
        step: 5,
        from: "Arduino Pin 5 (MSB - Bit 3)",
        to: "Resistor 4 → LED 3 Anode",
        wireColor: "White/Orange wire",
        description: "Connect digital pin 5 to the 220Ω resistor feeding LED 3 (representing 2^3 = value 8)."
      },
      {
        step: 6,
        from: "All 4 LED Cathodes",
        to: "Negative Ground Bus (−)",
        wireColor: "Direct Breadboard Connection",
        description: "Insert the short negative lead of each LED into the common ground bus or tie rows linked to the blue ground rail."
      }
    ],
    theoryTitle: "Binary Counting Mathematics & Bitwise Extraction",
    theoryContent: {
      heading: "How Bit-Shifting Controls Physical Pins",
      body: [
        "In 4-bit binary, four digits (bits) can represent 2^4 = 16 distinct integer values, from 0 (0000) through 15 (1111).",
        "Instead of writing 16 separate if-else conditions or hardcoding pin states, we use bitwise right-shift `(count >> bit)` and bitwise AND `& 1` to dynamically extract the state of each bit position:",
        "1. Shift: `count >> bit` moves the target bit down to position 0 (the least significant position).",
        "2. Mask: `& 1` discards all higher bits, isolating strictly `0` (LOW) or `1` (HIGH).",
        "This is directly fed into `digitalWrite(LED_PINS[bit], bitValue)` in a compact, O(1) loop."
      ],
      formula: "bitValue = (count >> bit) & 0x01",
      formulaBreakdown: [
        { symbol: "count", meaning: "Current integer from 0 to 15 in the loop", value: "e.g. 11 (binary 1011)" },
        { symbol: "bit", meaning: "Bit index being evaluated (0, 1, 2, or 3)", value: "0 to 3" },
        { symbol: ">>", meaning: "Bitwise right-shift operator", value: "Slides bits right by 'bit' places" },
        { symbol: "& 1", meaning: "Bitwise AND with mask 0001", value: "Isolates LSB (returns 0 or 1)" }
      ],
      truthTable: {
        headers: ["Decimal", "Bit 3 (Pin 5, 2³=8)", "Bit 2 (Pin 4, 2²=4)", "Bit 1 (Pin 3, 2¹=2)", "Bit 0 (Pin 2, 2⁰=1)", "Binary State"],
        rows: [
          [0, 0, 0, 0, 0, "0000"],
          [1, 0, 0, 0, 1, "0001"],
          [2, 0, 0, 1, 0, "0010"],
          [3, 0, 0, 1, 1, "0011"],
          [4, 0, 1, 0, 0, "0100"],
          [5, 0, 1, 0, 1, "0101"],
          [6, 0, 1, 1, 0, "0110"],
          [7, 0, 1, 1, 1, "0111"],
          [8, 1, 0, 0, 0, "1000"],
          [9, 1, 0, 0, 1, "1001"],
          [10, 1, 0, 1, 0, "1010"],
          [11, 1, 0, 1, 1, "1011"],
          [12, 1, 1, 0, 0, "1100"],
          [13, 1, 1, 0, 1, "1101"],
          [14, 1, 1, 1, 0, "1110"],
          [15, 1, 1, 1, 1, "1111"]
        ]
      }
    },
    codeFileName: "binary_counter.ino",
    code: `/*
 * 4-LED Binary Counter
 * 
 * Counts from 0 (0000) to 15 (1111) in binary using four LEDs,
 * each representing one bit of a 4-bit number. The counter
 * increments once per second and wraps back to 0 after reaching 15.
 * 
 * Pin mapping:
 *   Pin 2 → LED0 (Bit 0, LSB — least significant bit)
 *   Pin 3 → LED1 (Bit 1)
 *   Pin 4 → LED2 (Bit 2)
 *   Pin 5 → LED3 (Bit 3, MSB — most significant bit)
 * 
 * Each LED is connected through a 220Ω current-limiting resistor.
 * 
 * Note: Source code reconstructed for portfolio documentation.
 *       The original .ino file was not found on this system.
 * 
 * Hardware Lab: ECE & Robotics Learning Platform
 * Date:   September 2026
 */

// Array of digital pins driving each LED, indexed by bit position
const int LED_PINS[] = {2, 3, 4, 5};
const int NUM_LEDS   = 4;               // Number of LEDs (4-bit counter)
const int COUNT_DELAY_MS = 1000;         // Delay between count increments (ms)

void setup() {
  // Configure every LED pin as a digital output
  for (int i = 0; i < NUM_LEDS; i++) {
    pinMode(LED_PINS[i], OUTPUT);
  }
}

void loop() {
  // Count from 0 (0000 in binary) through 15 (1111 in binary)
  for (int count = 0; count < 16; count++) {

    // Extract each bit of 'count' and write it to the corresponding LED
    for (int bit = 0; bit < NUM_LEDS; bit++) {
      // (count >> bit) shifts the target bit into position 0
      // & 1 isolates that single bit → result is 0 or 1
      int bitValue = (count >> bit) & 1;
      digitalWrite(LED_PINS[bit], bitValue);
    }

    delay(COUNT_DELAY_MS);  // Hold the current count for 1 second
  }
  // After reaching 15 the for-loop restarts at 0 — continuous cycle
}`,
    whatILearned: [
      "Hardware bit-masking in C++ is much faster, cleaner, and less error-prone than manual switch-case or nested conditional blocks.",
      "Array pin indexing `LED_PINS[bit]` maps software abstractions directly to physical pin configurations, making code scalable to 8-bit or 16-bit counters with zero architectural change.",
      "Each LED must have its own separate resistor. Sharing a single resistor across multiple parallel LEDs causes varying brightness depending on how many LEDs are turned on simultaneously (current division).",
      "Common ground bus wiring on the breadboard is critical when coordinating multiple digital outputs."
    ],
    beginnerTips: [
      {
        title: "Separate Resistor per LED",
        tip: "Do not try to save breadboard space by routing all 4 LED cathodes into one shared resistor. When multiple LEDs turn on, they will compete for current and dim noticeably. Always give each LED its own dedicated 220Ω resistor."
      },
      {
        title: "LSB vs. MSB Orientation",
        tip: "Make sure you arrange your physical LEDs left-to-right or right-to-left matching your mental model. Standard convention places MSB (Bit 3, Pin 5) on the far left and LSB (Bit 0, Pin 2) on the far right so it reads like a written binary number."
      },
      {
        title: "Double-check Common Ground",
        tip: "Ensure your breadboard ground rail is connected to an Arduino GND pin. If none of the LEDs light up despite correct signal wiring, an ungrounded rail is almost always the cause."
      }
    ],
    githubFolderUrl: "https://github.com/A-941/arduino-robotics-journey/tree/main/02-binary-counter"
  },
  {
    id: "radar-system",
    title: "Radar System — HC-SR04 Ultrasonic Sweep & Live Processing Visualizer",
    badge: "Project 03",
    category: "Sensors, Actuation & Real-Time PC Visualization",
    date: "September 2026",
    shortDescription: "A 180° sweeping ultrasonic SONAR scanner. An SG90 servo rotates an HC-SR04 sensor degree-by-degree while distance data streams over Serial to a custom Processing 4 radar-scope GUI — red blips mark detected objects within 40 cm.",
    fullDescription: "The first project bridging embedded sensing with real-time PC visualization. The Arduino continuously sweeps a servo-mounted HC-SR04 ultrasonic sensor through the full 180° arc, transmitting compact angle/distance frames over UART at 9600 baud. A custom Processing sketch receives these frames and renders a live radar scope — concentric range arcs, an animated green sweep line, and bright red detection blips — with a motion-blur persistence effect that mimics a real CRT radar display.",
    tags: ["HC-SR04", "Ultrasonic Sensing", "Servo PWM", "Serial UART", "Processing 4", "Real-Time Visualization", "Arduino Uno"],
    thumbnail: "/images/radar-breadboard.jpg",
    circuitImage: "/images/radar-circuit.png",
    circuitBreadboardImage: "/images/radar-breadboard.jpg",
    videoSrc: "/videos/radar-demo.mp4",
    components: [
      { name: "Arduino Uno R3", quantity: 1, purpose: "Main microcontroller — servo control + ultrasonic pulse timing + serial TX" },
      { name: "HC-SR04 Ultrasonic Distance Sensor", quantity: 1, purpose: "Emits 40 kHz ultrasonic pulse and measures echo return time (range: 2–400 cm)" },
      { name: "SG90 Micro Servo Motor", quantity: 1, purpose: "Rotates HC-SR04 through 0°–180° arc at 1° resolution (PWM controlled)" },
      { name: "Male-to-Female Jumper Wires", quantity: 7, purpose: "5V, GND, TRIG (Pin 2), ECHO (Pin 3), servo signal (Pin 9), servo power, servo GND" },
      { name: "USB Type-A to Type-B Cable", quantity: 1, purpose: "Power supply, firmware upload, and live serial data transfer to PC" },
      { name: "PC running Processing 4", quantity: 1, purpose: "Receives serial frames and renders radar-scope display in real time" }
    ],
    wiringSteps: [
      {
        step: 1,
        from: "HC-SR04 VCC",
        to: "Arduino 5V Pin",
        wireColor: "Red wire",
        description: "Power the HC-SR04 from the Arduino 5V rail. The sensor draws ~15 mA during active pulsing — well within the Uno's 500 mA USB limit."
      },
      {
        step: 2,
        from: "HC-SR04 GND",
        to: "Arduino GND Pin",
        wireColor: "Black wire",
        description: "Complete the HC-SR04 power circuit with a common ground reference."
      },
      {
        step: 3,
        from: "HC-SR04 TRIG",
        to: "Arduino Pin 2",
        wireColor: "Orange wire",
        description: "The TRIG pin requires a 10 µs HIGH pulse to initiate each ultrasonic burst. The Arduino drives this from digital pin 2."
      },
      {
        step: 4,
        from: "HC-SR04 ECHO",
        to: "Arduino Pin 3",
        wireColor: "Yellow wire",
        description: "The ECHO pin goes HIGH for the duration of the return pulse. pulseIn() on pin 3 measures this duration in microseconds."
      },
      {
        step: 5,
        from: "SG90 Red (VCC)",
        to: "Arduino 5V Pin",
        wireColor: "Red wire",
        description: "The SG90 servo requires 4.8–6V at up to 500 mA stall current. For bench testing, 5V from the Uno is sufficient for a lightly-loaded sweep."
      },
      {
        step: 6,
        from: "SG90 Brown (GND)",
        to: "Arduino GND Pin",
        wireColor: "Brown/Black wire",
        description: "Servo ground must share the same reference as the Arduino digital logic ground for correct signal interpretation."
      },
      {
        step: 7,
        from: "SG90 Orange (Signal)",
        to: "Arduino Pin 9 (PWM)",
        wireColor: "Orange/Yellow wire",
        description: "The Servo.h library generates a 50 Hz PWM signal on pin 9. 1 ms pulse = 0°, 1.5 ms = 90°, 2 ms = 180°. The library handles this automatically via servo.write(angle)."
      }
    ],
    theoryTitle: "Ultrasonic Distance Sensing — Physics & Timing Mathematics",
    theoryContent: {
      heading: "How HC-SR04 Converts Sound to Distance",
      body: [
        "The HC-SR04 works by emitting a short 40 kHz ultrasonic burst (8 pulses triggered by a 10 µs logic-HIGH on TRIG) and then timing how long the ECHO pin stays HIGH — this duration equals the round-trip travel time for sound to reach an object and return.",
        "Speed of sound in air at ~20°C is approximately 343 m/s = 34,300 cm/s = 0.0343 cm/µs. Since the echo time covers the round-trip (out and back), we divide by 2 for the one-way distance.",
        "This gives us the fundamental distance formula: distance_cm = (echo_µs × 0.0343) / 2, which simplifies to: distance_cm = echo_µs / 58.",
        "In the firmware we use integer arithmetic: distance_cm = (duration / 2) / 29 — since 1 cm ≈ 29 µs one-way travel time."
      ],
      formula: "distance_cm = (echo_pulse_µs / 2) / 29",
      formulaBreakdown: [
        { symbol: "echo_pulse_µs", meaning: "ECHO pin HIGH duration measured by pulseIn()", value: "e.g. 1334 µs" },
        { symbol: "÷ 2", meaning: "Convert round-trip time to one-way travel time", value: "667 µs" },
        { symbol: "÷ 29 µs/cm", meaning: "Speed of sound: 1 cm ≈ 29 µs at 20°C, 343 m/s", value: "23 cm" },
        { symbol: "pulseIn timeout", meaning: "38000 µs max — prevents blocking on no echo", value: "≈ 655 cm max range" }
      ]
    },
    codeFileName: "radar_system.ino",
    code: `/*
 * Arduino Radar System — Servo Sweep + HC-SR04 Ultrasonic Distance Mapping
 *
 * Rotates an SG90 servo motor from 0° to 180° and back while continuously
 * measuring distance using the HC-SR04 ultrasonic sensor. Distance and angle
 * data are transmitted over Serial (9600 baud) to the Processing radar
 * visualizer running on the PC.
 *
 * Serial Output Format:
 *   "<angle>,<distance_cm>."    (dot '.' used as frame delimiter)
 *   Example: "45,23."
 *
 * Hardware Lab: ECE & Robotics Learning Platform
 * Date:   September 2026
 */

#include <Servo.h>

const int SERVO_PIN = 9;
const int TRIG_PIN  = 2;
const int ECHO_PIN  = 3;
const int SWEEP_DELAY_MS = 30;

Servo radarServo;

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  radarServo.attach(SERVO_PIN);
  radarServo.write(0);
  delay(500);
}

void loop() {
  for (int angle = 0; angle <= 180; angle++) {
    radarServo.write(angle);
    delay(SWEEP_DELAY_MS);
    sendData(angle, measureDistance());
  }
  for (int angle = 180; angle >= 0; angle--) {
    radarServo.write(angle);
    delay(SWEEP_DELAY_MS);
    sendData(angle, measureDistance());
  }
}

int measureDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long duration = pulseIn(ECHO_PIN, HIGH, 38000);
  int distance = (int)(duration / 2) / 29;
  if (distance == 0 || distance > 400) return 0;
  return distance;
}

void sendData(int angle, int distance) {
  Serial.print(angle);
  Serial.print(",");
  Serial.print(distance);
  Serial.print(".");
}`,
    whatILearned: [
      "Ultrasonic echo timing directly encodes distance via the speed of sound — no analog signal processing needed, just a precision timer on the ECHO pin.",
      "The Servo.h library abstracts 50 Hz PWM pulse-width generation into a clean write(angle) API, but internally it maps 0°–180° to 544–2400 µs pulse widths on the PWM timer.",
      "Serial framing with a delimiter character ('.' in this case) is far more robust than fixed-width packets because it tolerates varying digit counts in angle/distance values.",
      "Processing's bufferUntil('.') function is the exact complement of the Arduino's Serial.print('.') delimiter — together they form a complete, loss-tolerant serial protocol.",
      "The fill(0, 4) trick in Processing uses an 8-bit alpha value to slowly fade old frame pixels, creating the characteristic radar persistence/afterglow effect seen on real CRT radar displays."
    ],
    beginnerTips: [
      {
        title: "Close Serial Monitor Before Opening Processing",
        tip: "Both the Arduino Serial Monitor and the Processing serial library try to claim the same COM port. If Serial Monitor is open, Processing will throw a 'port busy' exception. Always close the IDE Serial Monitor before launching the Processing radar sketch."
      },
      {
        title: "Mount HC-SR04 Firmly on the Servo",
        tip: "The HC-SR04 needs to point exactly where the servo is aiming or your angle-to-distance mapping will be off. Use a small bracket, a servo horn with zip tie, or even hot glue to firmly attach the sensor to the servo. Any wobble introduces measurement noise."
      },
      {
        title: "Avoid Pointing at Soft or Angled Surfaces",
        tip: "Ultrasonic sensors struggle with soft absorbing materials (foam, carpet, fabric) and surfaces angled away from the beam axis. They work best on flat, rigid, perpendicular surfaces. Test with a wall or a book standing upright for clean readings."
      }
    ],
    githubFolderUrl: "https://github.com/A-941/arduino-robotics-journey/tree/main/03-radar-system"
  }
];


export const skillsList = [
  {
    category: "Embedded & Hardware",
    items: [
      { name: "Digital I/O & GPIO Control", level: "Core", desc: "Configuring input/output modes and driving logic levels" },
      { name: "Circuit Prototyping", level: "Core", desc: "Solderless breadboard layout, clean routing, bus rails" },
      { name: "Ohm's Law Application", level: "Theory", desc: "Current limiting, voltage division, component protection" },
      { name: "Arduino Uno (ATmega328P)", level: "Hardware", desc: "Pin capabilities, clock speeds, 5V/3.3V logic levels" },
      { name: "Component Identification", level: "Practical", desc: "LED polarity, resistor color coding, schematic symbols" },
      { name: "Ultrasonic Sensing (HC-SR04)", level: "Sensor", desc: "40 kHz echo pulse timing, speed of sound distance calculation" },
      { name: "Servo PWM Control (SG90)", level: "Actuation", desc: "Servo.h library, 50 Hz PWM, 0°–180° angular positioning" }
    ]
  },
  {
    category: "Software & Logic",
    items: [
      { name: "Embedded C / C++", level: "Core", desc: "setup(), loop(), pin arrays, time-based delays" },
      { name: "Bitwise Manipulation", level: "CS", desc: "Right-shift (>>), bitmasking (& 1), binary representation" },
      { name: "Array Pin Mapping", level: "Clean Code", desc: "Scalable pin definitions and programmatic iteration" },
      { name: "Timing & Signal Cycles", level: "Systems", desc: "Square-wave generation, frequency, cycle control" },
      { name: "Serial Framing Protocol", level: "Communication", desc: "Delimiter-based UART frames, bufferUntil(), real-time PC data streaming" },
      { name: "Processing 4 GUI", level: "Visualization", desc: "Radar-scope graphics, trig projection, motion-blur persistence effects" }
    ]
  },
  {
    category: "AI & Future Robotics Roadmap",
    items: [
      { name: "Computer Vision (Edge)", level: "Roadmap", desc: "Object detection, visual lane tracking with OpenCV" },
      { name: "Sensor Fusion", level: "Roadmap", desc: "Combining ultrasonic, IMU, and infrared telemetry" },
      { name: "Motor Actuation & PID", level: "Roadmap", desc: "H-bridge drivers, PWM speed control, closed-loop feedback" },
      { name: "Embedded ML / TinyML", level: "Roadmap", desc: "Deploying quantized neural networks onto microcontrollers" }
    ]
  }
];

export const roadmapMilestones = [
  {
    phase: "Phase 1: Digital Fundamentals",
    status: "completed",
    projects: [
      { title: "LED Blink", desc: "GPIO output, square-wave timing, Ohm's Law derivation" },
      { title: "4-LED Binary Counter", desc: "Bitwise logic, multi-pin arrays, 4-bit binary counting" }
    ]
  },
  {
    phase: "Phase 2: Sensors & Analog Telemetry",
    status: "in-progress",
    projects: [
      { title: "Radar System (HC-SR04 + Servo + Processing)", desc: "Ultrasonic sweep, servo PWM, serial framing, live radar GUI — COMPLETED" },
      { title: "LDR Light Sensor & Analog Read (ADC)", desc: "10-bit analog conversion, voltage dividers, threshold triggers" },
      { title: "DHT11 Climate Station", desc: "One-wire digital protocol, temperature & relative humidity logging" }
    ]
  },
  {
    phase: "Phase 3: Actuation & Motor Control",
    status: "upcoming",
    projects: [
      { title: "PWM Servo Position Control", desc: "Pulse width modulation for angular positioning (0°–180°)" },
      { title: "L298N Dual DC Motor Driver", desc: "H-Bridge polarity switching, speed ramping, differential drive" }
    ]
  },
  {
    phase: "Phase 4: Autonomous Robotics & Edge AI",
    status: "upcoming",
    projects: [
      { title: "Autonomous Obstacle-Avoiding Rover", desc: "Ultrasonic sweep, state machine navigation, collision prevention" },
      { title: "High-Speed PID Line Follower", desc: "Infrared array, proportional-integral-derivative steering" },
      { title: "ESP32-CAM Edge Vision Robot", desc: "On-device image classification and AI-driven autonomous steering" }
    ]
  }
];
