# structure

type:

- lineart
- fill
- mixed
- shading

- $characterName // name of the character to draw
  - $mainPart // name of the body part of the character to draw
    - index.ts // groups all the types files that draw the body part
    - $mainPart[type].ts // type of the drawing
    - animations // animations concerning the body part
      - animation1.ts
      - animation2.ts
    - $mainPart.details // details (or sub parts) of the body part
      - index.ts
      - $subPart
        - $subPart[type].ts
        - animations
          - subAnimation1.ts
          - subAnimation2.ts
        - $subPart.details
          - [etc...]

## animation structure

### Proposal 1

- animations
  - animation1.ts // file animating the body part (all types)
  - animation2.ts

### Proposal 2

- animations
  - animation1 // folder containing the animation
    - animation1[type].ts // animate a specific type of the body part
  - animation2
    - animation2.all.ts // animate all types of the body part
    - animation2.shading.ts // additional animation for the shading of the body part
