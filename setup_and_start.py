import subprocess
import os
import platform

def run_command(command, working_dir, log_file):
    """Runs a command in a specified directory and logs the output."""
    is_windows = platform.system() == "Windows"
    # For Windows, shell=True might be necessary for npm commands
    use_shell = is_windows

    with open(log_file, "w") as f:
        process = subprocess.Popen(
            command if use_shell else command.split(),
            cwd=working_dir,
            stdout=f,
            stderr=subprocess.STDOUT,
            shell=use_shell
        )
    return process

def main():
    """Installs dependencies and starts the client and server."""
    server_dir = os.path.join(os.path.dirname(__file__), "server")
    client_dir = os.path.join(os.path.dirname(__file__), "client")

    print("--- Installing server dependencies ---")
    subprocess.run("npm install", cwd=server_dir, check=True, shell=True)
    print("--- Server dependencies installed ---\n")

    print("--- Installing client dependencies ---")
    subprocess.run("npm install", cwd=client_dir, check=True, shell=True)
    print("--- Client dependencies installed ---\n")

    print("--- Starting servers ---")

    # Start the server
    print("Starting backend server... Logs will be in server_setup.log")
    server_command = "node index.js"
    run_command(server_command, server_dir, "server_setup.log")

    # Start the client
    print("Starting frontend client... Logs will be in client_setup.log")
    # Use react-scripts directly to avoid interactive mode issues
    client_start_command = os.path.join("node_modules", ".bin", "react-scripts") + " start"
    run_command(client_start_command, client_dir, "client_setup.log")

    print("\n--- Servers have been started in the background ---")
    print("You can view the server logs in 'server_setup.log' and the client logs in 'client_setup.log'.")
    print("It may take a few moments for the client to become available.")

if __name__ == "__main__":
    main()
