 

# Interface



## USB Type-C 12P Plug Interface        

This document provides the pin definitions and technical specifications for the **USB Type-C 3.2 12P Plug**. This connector features a 2-layer PCB design with a built-in 5.1KΩ resistor.



### Mechanical Drawing

![Type-C 12P Plug Drawing](/img/typec_pin/typec_pin_def2.png)



*Total length: 14.50±0.30mm, Width: 8.25±0.03mm*

（Note: Refer to the official engineering drawing for precise dimensions in mm. ）



### Pin Definition

The following table defines the 12-pin configuration for the Type-C plug. Note that this design uses a specific 12-pin layout optimized for standard power and USB 2.0 data transfer.

![Type-C 12P Plug Drawing](/img/typec_pin/typec_pin_def3.png)



USB Type‑C Pin Mapping：

| Row  | Pin  | Signal | Notes              |
| ---- | ---- | ------ | ------------------ |
| A    | A1   | GND    | Ground             |
| A    | A4   | VBUS   | Bus power          |
| A    | A5   | CC1    | Configuration ch.1 |
| A    | A6   | D+     | USB 2.0 data +     |
| A    | A7   | D−     | USB 2.0 data −     |
| A    | A8   | —      | Not connected / RF |
| A    | A9   | VBUS   | Bus power          |
| A    | A12  | GND    | Ground             |
| B    | B12  | GND    | Ground             |
| B    | B9   | VBUS   | Bus power          |
| B    | B8   | —      | Not connected / RF |
| B    | B7   | D−     | USB 2.0 data −     |
| B    | B6   | D+     | USB 2.0 data +     |
| B    | B5   | CC2    | Configuration ch.2 |
| B    | B4   | VBUS   | Bus power          |
| B    | B1   | GND    | Ground             |



### Technical Specifications

#### 1. Electrical Characteristics
*   **Current Rating:** 3.0 A
*   **Insulator Resistance:** 100 MΩ Min.
*   **Withstanding Voltage:** 100 VAC/minute
*   **Contact Resistance:** 40 mΩ Max.
*   **Integrated Resistor:** Includes a **5.1KΩ (RD)** pull-down resistor for device identification.

#### 2. Mechanical Characteristics
*   **Mating Force:** 5 ~ 20N
*   **Unmating Force:** 8 ~ 20N
*   **Durability:** ≥ 10,000  mating cycles

#### 3. Material Specifications
| Component   | Material     | Remarks         |
| :---------- | :----------- | :-------------- |
| **Housing** | LCP UL94 V-0 | Black           |
| **Shell**   | SUS 304 1/2H | Ni 50u" Plating |
| **Contact** | C7025 T=0.20 | Gold/Ni Plated  |
| **PCB**     | FR-4 4-Lay   | PCB-205-4H03    |



### Design & Layout Guidelines

When integrating this connector into your design:

1. **Power (VBUS)**
   - Connect all VBUS pins (A4, A9, B4, B9) together on the PCB for current sharing.
   - Size copper and protection components for up to 3 A continuous current.
2. **Ground (GND)**
   - Tie A1, A12, B1, B12 and the **shell** to system ground.
   - Provide multiple vias to the ground plane near each pad to reduce impedance.
3. **USB 2.0 Data (D+/D−)**
   - Route A6 (D+) and A7 (D−) as a **differential pair** with controlled impedance (typically 90 Ω differential).
   - Keep the pair short, length‑matched and isolated from noisy signals.
4. **Configuration Channel (CC1/CC2)**
   - Use CC1 (A5) and CC2 (B5) for role detection, cable orientation and current advertisement as defined by the USB Type‑C specification.
   - Maintain the **5.1 kΩ Rd** connection to GND if you are integrating this as a UFP (device‑side) interface.
5. **Shielding**
   - Connect the shell to chassis or system ground through low‑impedance paths; add ESD protection devices as required.



### Connection Logic

The schematic diagram indicates the following wiring logic:

- **Data Path:** Uses A6 (D+) and A7 (D-) for USB 2.0 differential signaling.
- **Power Path:** High-current 3A support via grouped VBUS and GND pins.
- **Configuration Channel:** Uses CC1/CC2 with an integrated **RD 5.1KΩ** resistor to enable Downstream Facing Port (DFP) detection.

:::tip Design Note
This 12-pin version is ideal for charging cables and USB 2.0 data applications where the full 24-pin Type-C set is not required, reducing cost and complexity while maintaining physical compatibility.
:::
