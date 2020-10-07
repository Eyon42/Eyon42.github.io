---
layout: project_blogpost
project_name: "Musical notes distribution graphs"
---

Recently i started to try and learn more songs on guitar by ear, an important part of doing that is learning which key is the song in. So i thought it would be usefull to see the distribution of the notes in the song to figure that out.

I started looking up how could i get the note data and after looking at a bunch of different formats for storing music data I decided to first test with MIDI, as it is a pretty common format and had a [Well Documented library](https://mido.readthedocs.io/).

After some reading and exploring in a Jupyter Notebook i wrote a couple functions to extract the note data and count it. Then i plotted the result with [Matplotlib](https://matplotlib.org/).

Once i got that working i decided to expand a bit and add the posibility to get data from Guitar Pro Files directly, as the MIDI files i used were exported from gpt files. For this i used the [PyGuitarPro](https://pyguitarpro.readthedocs.io) Library.

## Some extra examples

<h3 class="center"> Cementary Gates - Pantera </h3>
![Cementary Gates - Pantera](/assets/Images/Cemetary%20Gates.png)

<h3 class="center"> Dystopia - Megadeth </h3>
![Dystopia - Megadeth](/assets/Images/Dystopia.png)

<h3 class="center"> Inmortal Melancholy - Epica </h3>
![Inmortal Melancholy - Epica](/assets/Images/Immortal%20Melancholy.png)

<h3 class="center"> Bohemian Rhapsody - Queen </h3>
![Bohemian Rhapsody - Queen](/assets/Images/Q-BhR.png)