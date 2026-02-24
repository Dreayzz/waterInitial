#version 330

// Input Variables (received from Vertex Shader)
in vec4 color;
in vec4 position;
in vec3 normal;
in vec2 texCoord0;

uniform sampler2D textureBed;
uniform sampler2D textureShore;

uniform vec3 fogColour;
in float fogFactor;

// Water-related
uniform vec3 waterColor;

// Input: Water Related
in float waterDepth; // water depth (positive for underwater, negative for the shore)

// Output Variable (sent down through the Pipeline)
out vec4 outColor;

void main(void) 
{
	// shoreline multitexturing
	float isAboveWater = clamp(-waterDepth, 0, 1);
	outColor = color;
	outColor *= mix(texture(textureBed, texCoord0), texture(textureShore, texCoord0), isAboveWater);

	outColor = mix(vec4(fogColour, 1), outColor, fogFactor);
}
