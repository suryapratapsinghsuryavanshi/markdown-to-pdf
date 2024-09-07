import subprocess

def get_drive_info():
    try:
        # Run the lshw command and capture the output
        result = subprocess.run(['sudo', 'lshw', '-class', 'disk', '-class', 'storage'], 
                                capture_output=True, text=True)
        
        # Check if the command was successful
        if result.returncode != 0:
            print(f"Command failed with return code {result.returncode}")
            print(result.stderr)
            return

        # Split the output into lines for parsing
        lines = result.stdout.splitlines()
        print(lines)
        # Parse and display relevant information
        for i, line in enumerate(lines):
            if "description:" in line and "Disk" in line:
                print("Disk Information:")
                for j in range(i, i+10):
                    if j < len(lines):
                        print(lines[j].strip())

    except Exception as e:
        print(f"An error occurred: {e}")

get_drive_info()
